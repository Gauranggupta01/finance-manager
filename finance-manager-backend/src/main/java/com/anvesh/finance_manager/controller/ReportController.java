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

        double income = 0;
        double expense = 0;

        for (Transaction t : transactions) {

            if ("INCOME".equalsIgnoreCase(t.getType())) {

                income += t.getAmount();

            } else {

                expense += t.getAmount();
            }
        }

        Map<String, Object> report =
                new HashMap<>();

        report.put("totalIncome", income);

        report.put("totalExpense", expense);

        report.put("netSavings", income - expense);

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

        for (Transaction t : transactions) {

            if (t.getDate() == null ||
                    t.getDate().isEmpty()) {

                continue;
            }

            try {

                String[] parts =
                        t.getDate().split("-");

                int transactionYear =
                        Integer.parseInt(parts[0]);

                int transactionMonth =
                        Integer.parseInt(parts[1]);

                if (transactionMonth == month &&
                        transactionYear == year) {

                    if ("INCOME".equalsIgnoreCase(
                            t.getType()
                    )) {

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

            } catch (Exception e) {

                System.out.println(
                        "Invalid date format: "
                                + t.getDate()
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

        for (Transaction t : transactions) {

            if (t.getDate() == null ||
                    t.getDate().isEmpty()) {

                continue;
            }

            try {

                String[] parts =
                        t.getDate().split("-");

                int transactionYear =
                        Integer.parseInt(parts[0]);

                int transactionMonth =
                        Integer.parseInt(parts[1]);

                if (transactionYear == year) {

                    double current =
                            monthlySavings.get(
                                    transactionMonth
                            );

                    if ("INCOME".equalsIgnoreCase(
                            t.getType()
                    )) {

                        monthlySavings.put(

                                transactionMonth,

                                current + t.getAmount()
                        );

                    } else {

                        monthlySavings.put(

                                transactionMonth,

                                current - t.getAmount()
                        );
                    }
                }

            } catch (Exception e) {

                System.out.println(
                        "Invalid date format: "
                                + t.getDate()
                );
            }
        }

        return monthlySavings;
    }
}