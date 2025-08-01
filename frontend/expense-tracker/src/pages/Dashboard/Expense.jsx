import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useState, useEffect } from 'react'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import toast from 'react-hot-toast'

const Expense = () => {
   // Use the hook to ensure user data is loaded
    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal]=useState(false);
    
    // Get All Expense Details
    const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading (true);

    try {
      console.log("Fetching expense details from:", API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      console.log("Expense API response:", response.data);
      if (response.data){
       setExpenseData (response.data)
       console.log("Expense data set:", response.data);
      }
    } catch (error) {
      console.log("Something went wrong.", error)
    } finally {
      setLoading(false);
    }
  };

    // Handle Add Expense
  const handleAddExpense = async (expense) => {
    console.log("Expense data received:", expense);
    const { category, amount, date, icon } = expense;

    //Validation Checks
    if (!category.trim()) {
      toast.error("Expense category is required");
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
      console.log("Sending request to:", API_PATHS.EXPENSE.ADD_EXPENSE);
      console.log("Request data:", { category, amount, date, icon });
      
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      console.log("Response:", response);
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Failed to add expense", error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };



  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);
  
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          
        </div>

        <Modal 
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm 
            onAddExpense={handleAddExpense}/>

        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense;
