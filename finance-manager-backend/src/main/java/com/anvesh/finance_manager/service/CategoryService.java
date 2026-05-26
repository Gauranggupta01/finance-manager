package com.anvesh.finance_manager.service;

import com.anvesh.finance_manager.entity.Category;

import com.anvesh.finance_manager.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // GET USER CATEGORIES

    public List<Category> getCategories(
            String username
    ) {

        return categoryRepository
                .findByUsernameOrUsername(username, "default");
    }

    // CREATE CATEGORY

    public Category createCategory(
            Category category
    ) {

        boolean exists =

                categoryRepository
                        .existsByNameAndUsername(

                                category.getName(),

                                category.getUsername()
                        );

        if (exists) {

            return null;
        }

        return categoryRepository.save(
                category
        );
    }

    // DELETE CATEGORY

    public void deleteCategory(Long id) {

        Category category =
                categoryRepository.findById(id)
                        .orElse(null);

        if (category == null) {
            return;
        }

        // DON'T DELETE DEFAULT CATEGORY

        if (category.isDefaultCategory()) {
            return;
        }

        categoryRepository.deleteById(id);
    }
}