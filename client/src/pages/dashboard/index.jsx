import {useUser} from "@clerk/clerk-react"
import { FinanceForm } from "./finance-form";
import { FinanceList } from "./finance-list";

export const Dashboard = () =>{
    const {user} = useUser();
    return <div className="dashboard-container">
        <h1>Hey {user?.firstName}! Here's a peek at your financial record: </h1>
        <FinanceForm />
        <FinanceList />
    </div>
}