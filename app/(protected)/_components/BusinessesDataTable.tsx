import React, { useState, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
import { FormError } from '@/components/form-error';

interface PlaceDetails {
  name: string;
  address: string;
  phone: string;
  website?: string;
  email?: string;
  socialMedia?: {
    instagram?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    tiktok?: string | null;
  };
}

const BusinessesDataTable = () => {
  const [location, setLocation] = useState("");
  const [sector, setSector] = useState("");
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBusinessesByLocationAndSector = async () => {
    setIsLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const response = await fetch(`/api/getBusinessesByLocationAndSector?negocio=${sector}&localizacion=${location}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch business details");
      }

      const data: PlaceDetails[] = await response.json();
      setPlaces(data);
    } catch (error: any) {
      setError(error.message);
      setPlaces([]);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const columns = useMemo<ColumnDef<PlaceDetails>[]>(() => [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Address', accessorKey: 'address' },
    { header: 'Phone', accessorKey: 'phone' },
    {
      header: 'Website', accessorKey: 'Website',
      cell: ({ row }) => {
        const website = row.original.website;
        return website != "No tiene sitio web" ? (
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {website}
          </a>
        ) : (
          <span>No</span>
        );
      },
    },
    { header: 'Email', accessorKey: 'email' , 
      cell: ({ row }) => { 
        const email = row.original.email;
        return email != "No tiene sitio web" ? (
          <p className="text-blue-500 underline">
            {email}
          </p>
        ) : (
          <span>No</span>
        );
    },
  },
], []);

  const table = useReactTable({
    data: places,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 rounded-xl w-10/12 flex flex-col mx-auto">
      <div className="flex space-x-4 pb-4 ">
       <Input
          type="text"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          placeholder="Enter Sector"
        />
         <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
        />
        <Button
          variant="default"
          onClick={fetchBusinessesByLocationAndSector}
          disabled={isLoading}
        >
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</> : 'Get Businesses'}
        </Button>
      </div>
      {error && <FormError message={error} />}
      { places.length > 0 && (
        <div className="rounded-md border mt-5 p-4 shadow-lg bg-card">
        <Table className="justify-center">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="items-align max-w-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      )}
      
    </div>
  );
};

export default BusinessesDataTable;
