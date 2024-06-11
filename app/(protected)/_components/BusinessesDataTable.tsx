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
import { Loader2, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { FormError } from '@/components/form-error';
import { constants } from '@/constants';
import Link from 'next/link';

export interface PlaceDetails {
  name: string;
  formatted_address: string;
  formatted_phone_number: string;
  website?: string;
  email?: string;
  socialMedia?: {
    instagram?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    tiktok?: string | null;
  };
  rating?: number;
  user_ratings_total?: number;
  potentialClientRating?: 'Low' | 'Mid' | 'High';
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
      const response = await fetch(`/api/getBusinessesByLocationAndSector?location=${location}&sector=${sector}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch business details");
      }
      const data: PlaceDetails[] = await response.json();

      const processedData = data.map(place => {
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
          potentialClientRating
        };
      });

      setPlaces(processedData.slice(0, constants.servicesUsage.getBusinessesByLocationAndSector.limiteConsultas)); // Limitar a 50 resultados
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
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => {
          const email = row.original.email;
          return email && email.length > 0 ? (
            <Link href={`mailto:${email}`} className="flex justify-center">
              <Mail className='cursor-pointer text-muted-foreground'/>
            </Link>
          ) : (
            <span className="flex justify-center">No</span>
          );
        }
      },
      {
        accessorKey: 'socialMedia',
        header: 'Social',
        cell: ({ row }) => {
          const { instagram, twitter, facebook, tiktok } = row.original.socialMedia || {};
          return (
            <div className="flex space-x-2 justify-center">
              {instagram && (
                <Link href={instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} className='cursor-pointer text-muted-foreground' />
                </Link>
              )}
              {twitter && (
                <Link href={twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter size={20}  className='cursor-pointer text-muted-foreground' />
                </Link>
              )}
              {facebook && (
                <Link href={facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook size={20} className='cursor-pointer text-muted-foreground' />
                </Link>
              )}
              {tiktok && (
                <Link href={tiktok} target="_blank" rel="noopener noreferrer">
                  Tiktok
                </Link>
              )}
            </div>
          );
        }
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
    <div>
      <div className="justify-between items-center p-4 rounded-xl w-full">
        <div className="flex space-x-4 pb-4">
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
        {error && <FormError message={error}/>}
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
                        <TableCell key={cell.id} className='items-align'>
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

export default BusinessesDataTable;