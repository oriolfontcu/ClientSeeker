"use client";

import { useState } from 'react';
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
import Link from 'next/link';
import { fakeCompanies } from '@/data/fakeCompanies';

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

export const TryIt = () => {
  const [location, setLocation] = useState("");
  const [sector, setSector] = useState("");
  const [place, setPlace] = useState<PlaceDetails | null>(null);
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
      setPlace(data[0] || null); // Only set the first result
    } catch (error: any) {
      setError(error.message);
      setPlace(null);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className='lg:w-3/4 w-10/12'>
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
        {place && (
          <div className="rounded-md border mt-5">
            <Table className='justify-center'>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Social</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{place.name}</TableCell>
                  <TableCell>{place.formatted_address}</TableCell>
                  <TableCell>{place.formatted_phone_number}</TableCell>
                  <TableCell>
                    {place.website ? (
                      <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {place.website}
                      </a>
                    ) : (
                      <span>No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {place.email ? (
                      <Link href={`mailto:${place.email}`}>
                        <Mail className='cursor-pointer text-muted-foreground'/>
                      </Link>
                    ) : (
                      <span>No</span>
                    )}
                  </TableCell>
                  <TableCell className='flex space-x-2'>
                    {place.socialMedia?.instagram && (
                      <Link href={place.socialMedia?.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram size={20} className='cursor-pointer text-muted-foreground' />
                      </Link>
                    )}
                    {place.socialMedia?.twitter && (
                      <Link href={place.socialMedia?.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter size={20}  className='cursor-pointer text-muted-foreground' />
                      </Link>
                    )}
                    {place.socialMedia?.facebook && (
                      <Link href={place.socialMedia?.facebook} target="_blank" rel="noopener noreferrer">
                        <Facebook size={20} className='cursor-pointer text-muted-foreground' />
                      </Link>
                    )}
                    {place.socialMedia?.tiktok && (
                      <Link href={place.socialMedia?.tiktok} target="_blank" rel="noopener noreferrer">
                        Tiktok
                      </Link>
                    )}
                    {!place.socialMedia && (
                      <span>No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={place.potentialClientRating === 'High' ? 'text-green-500' : place.potentialClientRating === 'Mid' ? 'text-yellow-500' : 'text-red-500'}>
                      {place.potentialClientRating}
                    </span>
                  </TableCell>
                </TableRow>
                {fakeCompanies.map((fake, index) => (
                  <TableRow key={index} className="blur-sm justify-center select-none">
                    <TableCell>{fake.name}</TableCell>
                    <TableCell>{fake.formatted_address}</TableCell>
                    <TableCell>{fake.formatted_phone_number}</TableCell>
                    <TableCell>
                      {fake.website ? (
                        <a href={fake.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          {fake.website}
                        </a>
                      ) : (
                        <span>No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {fake.email ? (
                        <Link href={`mailto:${fake.email}`}>
                          <Mail className='cursor-pointer text-muted-foreground'/>
                        </Link>
                      ) : (
                        <span>No</span>
                      )}
                    </TableCell>
                    <TableCell className='flex items-center space-x-2'>
                      {fake.socialMedia?.instagram && (
                        <Link href={fake.socialMedia?.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram size={20} className='cursor-pointer text-muted-foreground' />
                        </Link>
                      )}
                      {fake.socialMedia?.twitter && (
                        <Link href={fake.socialMedia?.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter size={20}  className='cursor-pointer text-muted-foreground' />
                        </Link>
                      )}
                      {fake.socialMedia?.facebook && (
                        <Link href={fake.socialMedia?.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook size={20} className='cursor-pointer text-muted-foreground' />
                        </Link>
                      )}
                      {fake.socialMedia?.tiktok && (
                        <Link href={fake.socialMedia?.tiktok} target="_blank" rel="noopener noreferrer">
                          Tiktok
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={fake.potentialClientRating === 'High' ? 'text-green-500' : fake.potentialClientRating === 'Mid' ? 'text-yellow-500' : 'text-red-500'}>
                        {fake.potentialClientRating}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};
