package com.anvesh.finance_manager.controller;

import com.anvesh.finance_manager.entity.Category;

import com.anvesh.finance_manager.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // GET CATEGORIES

    @GetMapping("/{username}")
    public List<Category> getCategories(

            @PathVariable String username
    ) {

        return categoryService.getCategories(
                username
        );
    }

    // CREATE CATEGORY

    @PostMapping
    public Category createCategory(

            @RequestBody Category category
    ) {

        return categoryService.createCategory(
                category
        );
    }

    // DELETE CATEGORY

    @DeleteMapping("/{id}")
    public String deleteCategory(

            @PathVariable Long id
    ) {

        categoryService.deleteCategory(id);

        return "Category Deleted";
    }
}