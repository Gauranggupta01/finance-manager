package com.anvesh.finance_manager;

import com.anvesh.finance_manager.entity.Category;

import com.anvesh.finance_manager.repository.CategoryRepository;

import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FinanceManagerApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                FinanceManagerApplication.class,
                args
        );
    }

    // DEFAULT CATEGORIES

    @Bean
    CommandLineRunner run(

            CategoryRepository categoryRepository
    ) {

        return args -> {

            if (categoryRepository.count() == 0) {

                // INCOME CATEGORY

                String[] income = {

                        "Salary"
                };

                // EXPENSE CATEGORIES

                String[] expense = {

                        "Food",

                        "Rent",

                        "Transportation",

                        "Entertainment",

                        "Healthcare",

                        "Utilities"
                };

                // SAVE INCOME

                for (String name : income) {

                    Category category =
                            new Category();

                    category.setName(name);

                    category.setType("INCOME");

                    category.setUsername("default");

                    category.setDefaultCategory(true);

                    categoryRepository.save(category);
                }

                // SAVE EXPENSE

                for (String name : expense) {

                    Category category =
                            new Category();

                    category.setName(name);

                    category.setType("EXPENSE");

                    category.setUsername("default");

                    category.setDefaultCategory(true);

                    categoryRepository.save(category);
                }
            }
        };
    }
}