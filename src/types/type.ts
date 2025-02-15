export interface Guest {
  id: string;
  name: string;
  email: string;
  department?: string;
  initials: string;
}

export interface Visitor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  type: 'Vendor' | 'Contract Staff' | 'Interview' | 'Business Guest';
  purpose: string;
  office: string;
  hostId: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  expectedCheckOut?: string;
  status: 'PENDING' | 'CHECKED_IN' | 'CHECKED_OUT' | 'OVERSTAY' | 'CANCELLED';
  selfCheckIn: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  host?: {
    id: string;
    name: string;
    email: string;
    department?: string;
  };
}
