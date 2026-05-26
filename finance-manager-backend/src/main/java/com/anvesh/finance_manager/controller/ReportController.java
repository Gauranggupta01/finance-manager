package com.anvesh.finance_manager.controller;

import com.anvesh.finance_manager.dto.ReportResponse;

import com.anvesh.finance_manager.entity.Transaction;

import com.anvesh.finance_manager.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import java.util.List;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportController {

    @Autowired
    private TransactionService transactionService;

    // DASHBOARD REPORT

    @GetMapping("/{username}")
    public Map<String, Object> getReport(

            @PathVariable String username
    ) {

        List<Transaction> transactions =

                transactionService
                        .getTransactionsByUsername(
                                username
                        );

        double income = 0;

        double expense = 0;

        for (Transaction t : transactions) {

            if ("INCOME".equals(t.getType())) {

                income += t.getAmount();

            } else {

                expense += t.getAmount();
            }
        }

        Map<String, Object> report =
                new HashMap<>();

        report.put(
                "totalIncome",
                income
        );

        report.put(
                "totalExpense",
                expense
        );

        report.put(
                "netSavings",
                income - expense
        );

        return report;
    }

    // MONTHLY REPORT

    @GetMapping("/monthly/{username}")
    public ReportResponse getMonthlyReport(

            @PathVariable String username,

            @RequestParam int month,

            @RequestParam int year
    ) {

        List<Transaction> transactions =

                transactionService
                        .getTransactionsByUsername(
                                username
                        );

        Map<String, Double> incomeByCategory =
                new HashMap<>();

        Map<String, Double> expenseByCategory =
                new HashMap<>();

        double totalIncome = 0;

        double totalExpense = 0;

        for (Transaction t : transactions) {

            if (t.getDate() == null) {
                continue;
            }

            if (t.getDate().getMonthValue() == month &&
                    t.getDate().getYear() == year) {

                if ("INCOME".equals(t.getType())) {

                    totalIncome += t.getAmount();

                    incomeByCategory.put(

                            t.getCategory(),

                            incomeByCategory.getOrDefault(
                                    t.getCategory(),
                                    0.0
                            ) + t.getAmount()
                    );

                } else {

                    totalExpense += t.getAmount();

                    expenseByCategory.put(

                            t.getCategory(),

                            expenseByCategory.getOrDefault(
                                    t.getCategory(),
                                    0.0
                            ) + t.getAmount()
                    );
                }
            }
        }

        return new ReportResponse(

                incomeByCategory,

                expenseByCategory,

                totalIncome - totalExpense
        );
    }

    // YEARLY REPORT

    @GetMapping("/yearly/{username}")
    public Map<Integer, Double> getYearlyReport(

            @PathVariable String username,

            @RequestParam int year
    ) {

        List<Transaction> transactions =

                transactionService
                        .getTransactionsByUsername(
                                username
                        );

        Map<Integer, Double> monthlySavings =
                new HashMap<>();

        for (int i = 1; i <= 12; i++) {

            monthlySavings.put(i, 0.0);
        }

        for (Transaction t : transactions) {

            if (t.getDate() == null) {
                continue;
            }

            if (t.getDate().getYear() == year) {

                int month =
                        t.getDate().getMonthValue();

                double current =
                        monthlySavings.get(month);

                if ("INCOME".equals(t.getType())) {

                    monthlySavings.put(

                            month,

                            current + t.getAmount()
                    );

                } else {

                    monthlySavings.put(

                            month,

                            current - t.getAmount()
                    );
                }
            }
        }

        return monthlySavings;
    }
}