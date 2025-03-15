import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Expense, Paginate } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Expenses',
        href: '/expenses',
    },
];

type DeleteExpenseForm = {
    id: number;
};

export default function ExpenseList({ expenses }: { expenses: Paginate<Expense> }) {
    const { flash } = usePage().props;
    const {
        data,
        setData,
        delete: destroy,
        processing,
        wasSuccessful,
    } = useForm<Required<DeleteExpenseForm>>({
        id: 0,
    });

    useEffect(() => {
        wasSuccessful &&
            toast.success('Success', {
                description: flash.message,
            });
    }, [wasSuccessful]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('expenses.destroy', data.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expense List" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">Expense List</h1>
                    <Button onClick={() => router.visit(route('expenses.create'))}>
                        <Plus />
                        New
                    </Button>
                </div>
                <Table>
                    <TableCaption>A list of your recent expenses.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Expense At</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        ) : (
                            expenses.data.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.category.name}</TableCell>
                                    <TableCell>{expense.description}</TableCell>
                                    <TableCell>{expense.amount}</TableCell>
                                    <TableCell>{expense.expense_at}</TableCell>
                                    <TableCell>{expense.created_at}</TableCell>
                                    <TableCell>{expense.updated_at}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                                <DropdownMenuItem>View expense</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => router.visit(`expenses/${expense.id}/edit`)}>
                                                    Update expense
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete expense</DropdownMenuItem>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription>
                                                                    This action cannot be undone. This will permanently delete your expense.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter>
                                                                <form onSubmit={submit}>
                                                                    <DialogClose asChild>
                                                                        <Button type="button" variant="secondary" className="mr-2">
                                                                            Cancel
                                                                        </Button>
                                                                    </DialogClose>
                                                                    <Button
                                                                        type="submit"
                                                                        variant="destructive"
                                                                        disabled={processing}
                                                                        onClick={() => setData('id', expense.id)}
                                                                    >
                                                                        {processing ? 'Deleting...' : 'Delete'}
                                                                    </Button>
                                                                </form>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={expenses.prev_page_url}
                                className={`${(!expenses.from || expenses.current_page === expenses.from) && 'pointer-events-none opacity-50'}`}
                            />
                        </PaginationItem>
                        {expenses.links
                            .filter((link) => !link.label.includes('Previous') && !link.label.includes('Next'))
                            .map((link) => (
                                <PaginationItem key={link.label}>
                                    <PaginationLink isActive={link.active} href={link.url}>
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        <PaginationItem>
                            <PaginationNext
                                href={expenses.next_page_url}
                                className={`${expenses.current_page === expenses.last_page && 'pointer-events-none opacity-50'}`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    );
}
