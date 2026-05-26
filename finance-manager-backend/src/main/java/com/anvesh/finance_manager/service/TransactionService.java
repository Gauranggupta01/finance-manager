package com.anvesh.finance_manager.service;

import com.anvesh.finance_manager.entity.Transaction;

import com.anvesh.finance_manager.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // CREATE TRANSACTION

    public Transaction createTransaction(
            Transaction transaction
    ) {

        return transactionRepository.save(
                transaction
        );
    }

    // GET ALL TRANSACTIONS

    public List<Transaction> getAllTransactions() {

        return transactionRepository.findAll();
    }

    // GET USER TRANSACTIONS

    public List<Transaction> getTransactionsByUsername(
            String username
    ) {

        return transactionRepository
                .findByUsername(username);
    }

    // DELETE TRANSACTION

    public void deleteTransaction(Long id) {

        transactionRepository.deleteById(id);
    }

    // UPDATE TRANSACTION

    public Transaction updateTransaction(

            Long id,

            Transaction updatedTransaction
    ) {

        Transaction transaction =

                transactionRepository
                        .findById(id)
                        .orElse(null);

        if (transaction == null) {

            return null;
        }

        transaction.setAmount(
                updatedTransaction.getAmount()
        );

        transaction.setDescription(
                updatedTransaction.getDescription()
        );

        transaction.setCategory(
                updatedTransaction.getCategory()
        );

        transaction.setType(
                updatedTransaction.getType()
        );

        transaction.setDate(
                updatedTransaction.getDate()
        );

        transaction.setUsername(
                updatedTransaction.getUsername()
        );

        return transactionRepository.save(
                transaction
        );
    }
}