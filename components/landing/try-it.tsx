"use client";

import { useState, useMemo } from 'react';
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
import { fakeCompanies } from '@/data/fakeCompanies';

export interface PlaceDetails {
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  potentialClientRating?: 'Low' | 'Mid' | 'High';
  isBlurred?: boolean; // Agregar esta línea para incluir la propiedad isBlurred
}

export const TryIt = () => {
  const [location, setLocation] = useState("");
  const [sector, setSector] = useState("");
  const [places, setPlaces] = useState<PlaceDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBusinessesByLocationAndSector = async () => {
    setIsLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const response = await fetch(`/api/getBusinessesByLocationAndSector?location=${location}&sector=${sector}&isTesting=true`);
      if (!response.ok) {
        const errorData = await response.text();
        try {
          const parsedError = JSON.parse(errorData);
          throw new Error(parsedError.error || "Failed to fetch business details");
        } catch (jsonError) {
          throw new Error("Failed to fetch business details");
        }
      }
      const data: PlaceDetails[] = await response.json();

      const processedData = data.map((place, index) => {
        let potentialClientRating: 'Low' | 'Mid' | 'High' = 'Low';
        if (place.rating && place.user_ratings_total) {
          if (place.rating >= 4 && place.user_ratings_total >= 50) {
            potentialClientRating = 'High';
          } else if (place.rating >= 3 && place.user_ratings_total >= 20) {
            potentialClientRating = 'Mid';
          }
        }
        return {
          ...place,
          potentialClientRating,
          isBlurred: index !== 0 // Desenfocar todos menos el primero
        };
      });

      const fakeData = fakeCompanies.map(fake => ({ ...fake, isBlurred: true }));
      const finalData = [processedData[0], ...fakeData.slice(1, 10)];

      setPlaces(finalData); // Limitar a 50 resultados
    } catch (error: any) {
      setError(error.message);
      setPlaces([]);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const columns = useMemo<ColumnDef<PlaceDetails>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Business Name',
      },
      {
        accessorKey: 'formatted_address',
        header: 'Address',
      },
      {
        accessorKey: 'formatted_phone_number',
        header: 'Phone',
      },
      {
        accessorKey: 'website',
        header: 'Website',
        cell: ({ row }) => {
          const website = row.original.website;
          return website ? (
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {website}
            </a>
          ) : (
            <span>No</span>
          );
        },
      },
      {
        accessorKey: 'potentialClientRating',
        header: 'Rating',
        cell: ({ row }) => {
          const rating = row.original.potentialClientRating;
          let ratingClass = 'text-red-500';
          if (rating === 'Mid') {
            ratingClass = 'text-yellow-500';
          } else if (rating === 'High') {
            ratingClass = 'text-green-500';
          }
          return <span className={ratingClass}>{rating}</span>;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: places,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='lg:w-3/4 w-10/12 pb-32'>
      <div className="justify-between items-center p-4 rounded-xl bg-card">
        <div className="flex space-x-4">
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
          />
          <Input
            type="text"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="Enter Sector"
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
        {places.length > 0 && (
          <div className="rounded-md border mt-5">
            <Table className='justify-center'>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className={row.original.isBlurred ? 'blur-sm select-none' : ''}>
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
    </div>
  );
};
