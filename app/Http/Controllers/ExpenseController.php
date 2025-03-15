<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::with(['user', 'category'])->where('user_id', Auth::id())->latest()->paginate(10);
        return Inertia::render('expense/expense-list', ['expenses' => $expenses]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user_id = Auth::id();
        $categories = Category::all();
        return Inertia::render('expense/new-expense', ['user_id' => $user_id, 'categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|numeric',
            'category_id' => 'required|numeric',
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'expense_at' => 'required|' . Rule::date()->format('Y-m-d'),
        ]);

        Expense::create(attributes: $validated);

        return redirect()->back()->with('message', 'Expense created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        $user_id = Auth::id();
        $categories = Category::all();
        return Inertia::render('expense/update-expense', [
            'user_id' => $user_id,
            'categories' => $categories,
            'expense' => $expense
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        $validated = $request->validate([
            'user_id' => 'required|numeric',
            'category_id' => 'required|numeric',
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'expense_at' => 'required|' . Rule::date()->format('Y-m-d'),
        ]);

        $expense->update($validated);

        return redirect()->back()->with('message', 'Expense updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return to_route('expenses.index')->with('message', 'Expense deleted successfully!');
    }
}
