import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { FaSortAlphaDown } from "react-icons/fa";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getCoreRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'

const UserComponent = () => {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

    const fetchUserList = async () => {
        const page = pagination.pageIndex + 1;
        const req = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${pagination.pageSize}`);
        const res = await req.json();
        return res;
    };

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['userData', pagination],
        queryFn: fetchUserList,
    });

    const columns = [
        {
            header: 'Name',
            accessorKey: 'name',
            filterFn: 'includesString',
        },
        {
            header: 'Email',
            accessorKey: 'email',
            filterFn: 'includesString',
        },
        {
            header: 'Phone Number',
            accessorKey: 'phone',
        },
        {
            header: 'Website',
            accessorKey: 'website',
        },
    ];

    const table = useReactTable({ 
        columns, 
        data, 
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
    });

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    if (data && data.length === 0) {
        return <span>No users found.</span>;
    }

    return (
        <div>
            <input
                type="text"
                value={globalFilter}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search all columns..."
                className='mb-4 py-2 px-3 bg-slate-200 rounded-lg'
            />
            <Table>
                <TableCaption>A list of users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {table.getHeaderGroups().map(headerGroup => (
                            <React.Fragment key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <TableHead key={column.id} >
                                        <div className='flex justify-between items-center my-2 px-5 cursor-pointer' onClick={column.column.getToggleSortingHandler()}>
                                        {column.column.columnDef.header}
                                        <span>
                                            {column.column.getIsSorted() ? (column.column.getIsSorted() === 'desc' ? ' 🔽' : ' 🔼') : <FaSortAlphaDown />}
                                        </span>
                                        </div>
                                        <div>
                                        <input
                                            type="text"
                                            className='py-2 px-3 bg-slate-200 rounded-lg mb-2'
                                            placeholder={`Search ${column.column.columnDef.header}...`}
                                            value={column.column.getFilterValue() || ''}
                                            onChange={e => column.column.setFilterValue(e.target.value)}
                                        />
                                        </div>
                                    </TableHead>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id} className="font-medium text-left">
                                    {cell.getValue()}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='flex justify-between items-center'>
                <button onClick={() => setPagination(prev => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }))} disabled={pagination.pageIndex === 0}>
                    <MdOutlineSkipPrevious/>
                </button>
                <button onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}>
                    <MdOutlineSkipNext/>
                </button>
            </div>
        </div>
    );
}

export default UserComponent
