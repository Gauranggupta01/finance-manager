package com.anvesh.finance_manager.controller;

import com.anvesh.finance_manager.entity.Transaction;

import com.anvesh.finance_manager.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // CREATE TRANSACTION

    @PostMapping
    public Transaction createTransaction(

            @RequestBody Transaction transaction
    ) {

        return transactionService
                .createTransaction(transaction);
    }

    // GET USER-SPECIFIC TRANSACTIONS

    @GetMapping("/{username}")
    public List<Transaction> getTransactionsByUsername(

            @PathVariable String username
    ) {

        return transactionService

                .getTransactionsByUsername(
                        username
                );
    }

    // DELETE TRANSACTION

    @DeleteMapping("/{id}")
    public String deleteTransaction(
            @PathVariable Long id
    ) {

        transactionService.deleteTransaction(id);

        return "Transaction Deleted";
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(

            @PathVariable Long id,

            @RequestBody Transaction transaction
    ) {

        return transactionService.updateTransaction(
                id,
                transaction
        );
    }
}