package com.anvesh.finance_manager.dto;

import java.util.Map;

public class ReportResponse {

    private Map<String, Double> incomeByCategory;

    private Map<String, Double> expenseByCategory;

    private Double netSavings;

    public ReportResponse(
            Map<String, Double> incomeByCategory,
            Map<String, Double> expenseByCategory,
            Double netSavings
    ) {

        this.incomeByCategory = incomeByCategory;
        this.expenseByCategory = expenseByCategory;
        this.netSavings = netSavings;
    }

    public Map<String, Double> getIncomeByCategory() {
        return incomeByCategory;
    }

    public Map<String, Double> getExpenseByCategory() {
        return expenseByCategory;
    }

    public Double getNetSavings() {
        return netSavings;
    }
}