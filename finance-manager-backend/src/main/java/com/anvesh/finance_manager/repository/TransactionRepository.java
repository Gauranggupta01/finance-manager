package com.anvesh.finance_manager.repository;

import com.anvesh.finance_manager.entity.Transaction;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUsername(
            String username
    );
}