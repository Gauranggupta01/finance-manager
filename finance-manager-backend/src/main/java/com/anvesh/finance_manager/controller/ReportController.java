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
                        .getTransactionsByUsername(username);

        double totalIncome = 0;
        double totalExpense = 0;

        for (Transaction transaction : transactions) {

            if ("INCOME".equalsIgnoreCase(
                    transaction.getType()
            )) {

                totalIncome +=
                        transaction.getAmount();

            } else {

                totalExpense +=
                        transaction.getAmount();
            }
        }

        Map<String, Object> report =
                new HashMap<>();

        report.put(
                "totalIncome",
                totalIncome
        );

        report.put(
                "totalExpense",
                totalExpense
        );

        report.put(
                "netSavings",
                totalIncome - totalExpense
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
                        .getTransactionsByUsername(username);

        Map<String, Double> incomeByCategory =
                new HashMap<>();

        Map<String, Double> expenseByCategory =
                new HashMap<>();

        double totalIncome = 0;
        double totalExpense = 0;

        for (Transaction transaction : transactions) {

            String date =
                    transaction.getDate();

            if (date == null ||
                    date.isEmpty()) {

                continue;
            }

            try {

                String[] parts =
                        date.split("-");

                int transactionYear =
                        Integer.parseInt(parts[0]);

                int transactionMonth =
                        Integer.parseInt(parts[1]);

                if (
                        transactionYear == year &&
                        transactionMonth == month
                ) {

                    if ("INCOME".equalsIgnoreCase(
                            transaction.getType()
                    )) {

                        totalIncome +=
                                transaction.getAmount();

                        incomeByCategory.put(

                                transaction.getCategory(),

                                incomeByCategory.getOrDefault(

                                        transaction.getCategory(),

                                        0.0
                                ) + transaction.getAmount()
                        );

                    } else {

                        totalExpense +=
                                transaction.getAmount();

                        expenseByCategory.put(

                                transaction.getCategory(),

                                expenseByCategory.getOrDefault(

                                        transaction.getCategory(),

                                        0.0
                                ) + transaction.getAmount()
                        );
                    }
                }

            } catch (Exception e) {

                System.out.println(
                        "Invalid date format : "
                                + date
                );
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
                        .getTransactionsByUsername(username);

        Map<Integer, Double> monthlySavings =
                new HashMap<>();

        for (int i = 1; i <= 12; i++) {

            monthlySavings.put(i, 0.0);
        }

        for (Transaction transaction : transactions) {

            String date =
                    transaction.getDate();

            if (date == null ||
                    date.isEmpty()) {

                continue;
            }

            try {

                String[] parts =
                        date.split("-");

                int transactionYear =
                        Integer.parseInt(parts[0]);

                int transactionMonth =
                        Integer.parseInt(parts[1]);

                if (transactionYear == year) {

                    double currentValue =
                            monthlySavings.get(
                                    transactionMonth
                            );

                    if ("INCOME".equalsIgnoreCase(
                            transaction.getType()
                    )) {

                        monthlySavings.put(

                                transactionMonth,

                                currentValue +
                                        transaction.getAmount()
                        );

                    } else {

                        monthlySavings.put(

                                transactionMonth,

                                currentValue -
                                        transaction.getAmount()
                        );
                    }
                }

            } catch (Exception e) {

                System.out.println(
                        "Invalid date format : "
                                + date
                );
            }
        }

        return monthlySavings;
    }
}