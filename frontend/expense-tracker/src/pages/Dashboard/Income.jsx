import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'

const Income = () => {
  // Use the hook to ensure user data is loaded
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAler, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });


  
  const [openAddIncomeModal, setOpenAddIncomeModal]=useState(false);

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading (true);

    try {
      console.log("Fetching income details from:", API_PATHS.INCOME.GET_ALL_INCOME);
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      console.log("Income API response:", response.data);
      if (response.data){
       setIncomeData (response.data)
       console.log("Income data set:", response.data);
      }
    } catch (error) {
      console.log("Something went wrong.", error)
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Income 
  const handleAddIncome = async (income) => {
    console.log("Income data received:", income);
    const { source, amount, date, icon } = income;

    //Validation Checks
    if (!source.trim()) {
      toast.error("Income source is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try{
      console.log("Sending request to:", API_PATHS.INCOME.ADD_INCOME);
      console.log("Request data:", { source, amount, date, icon });
      
      const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      console.log("Response:", response);
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Failed to add income", error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // Delete Income 
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    }catch (error) {
      console.error("Failed to delete income", error.response?.data?.message || error.message);
    }
  };

  // hanndle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect (()=>{
    fetchIncomeDetails()

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
       <div className='grid grid-cols-1 gap-6'>
        <div className=''>
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={()=>setOpenAddIncomeModal(true)}
          />
        </div>
        <IncomeList 
          transactions={incomeData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id });
          }}
          onDownload={handleDownloadIncomeDetails}
        />
       </div>
       <Modal 
        isOpen={openAddIncomeModal}
        onClose={()=>setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm
          onAddIncome={handleAddIncome}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAler.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert 
          content = "Are you sure you want to delete this income source?"
          onDelete={() => deleteIncome(openDeleteAler.data)}
        />
      </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income