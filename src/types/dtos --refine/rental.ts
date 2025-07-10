export interface Rental {
  id: string;
  userId: string;
  bookstoreBookId: string;
  rentedAt: string;
  returnedAt: string | null;
}
