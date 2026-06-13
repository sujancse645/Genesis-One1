import asyncio
from pydantic import BaseModel
from typing import List
import random

class MonthData(BaseModel):
    month: int
    users: int
    mrr: float
    cash_balance: float
    burn_rate: float
    cac: float
    ltv: float
    churn: float

class SimulationEngine:
    async def run_simulation(self, scenario: str) -> List[MonthData]:
        # Simulate network delay for effect
        await asyncio.sleep(1)
        
        months = 60
        data = []
        
        # Initial State
        current_users = 100
        cash = 1000000.0  # $1M Seed
        base_burn = 50000.0
        arpu = 29.0 # Average Revenue Per User
        
        # Scenario variables
        if scenario == 'Aggressive':
            growth_rate = 0.18
            churn_rate = 0.05
            cac_base = 60.0
        elif scenario == 'Conservative':
            growth_rate = 0.08
            churn_rate = 0.02
            cac_base = 40.0
        else: # Worst Case
            growth_rate = 0.03
            churn_rate = 0.08
            cac_base = 100.0

        for m in range(1, months + 1):
            # Calculate MRR
            mrr = current_users * arpu
            
            # Calculate new users
            new_users = int(current_users * growth_rate * random.uniform(0.85, 1.15))
            churned_users = int(current_users * churn_rate)
            current_users += new_users - churned_users
            if current_users < 0:
                current_users = 0
            
            # Calculate financials
            marketing_spend = new_users * cac_base
            total_burn = base_burn + (marketing_spend * random.uniform(0.9, 1.1))
            
            # Net cash flow
            cash = cash + mrr - total_burn
            
            data.append(MonthData(
                month=m,
                users=current_users,
                mrr=round(mrr, 2),
                cash_balance=round(cash, 2),
                burn_rate=round(total_burn, 2),
                cac=round(cac_base, 2),
                ltv=round(arpu / churn_rate, 2),
                churn=churn_rate
            ))
            
            # Decrease growth rate slightly over time (market saturation)
            growth_rate *= 0.985
            # Increase CAC slightly over time
            cac_base *= 1.015
            
        return data
