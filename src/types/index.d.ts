type User = {
  id: string;
  idUser: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  idSocial?: string;
  imageUrl: string;
};

type ParkingLot = {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: string;
  long: string;
  idCompany: string;
  isDeleted: boolean;
};

type Vehicle = {
  //
  id: string;

  idVehicle: string;
  idUser: string;
  name: string;
  number: string;
  type: string;
};

type ParkingSlot = {
  //
  id: string;

  idParkingSlot: string;
  idBlock: string;
  slotNumber: number;
};

type Block = {
  idBlock: string;
  id: string;
  blockCode: string;
  description: string;
  isFull: boolean;
  numOfSlot: number;
  ParkingSlots: ParkingSlot[];

  //
  code: string;
  parkingSlots: ParkingSlot[];
};

type TimeFrame = {
  idTimeFrame: string;
  id: string;
  duration: number;
  cost: number;
};

type Booking = {
  //
  id: string;
  idTicket: string;
  idParkingReservation: string;
  parkingLot: ParkingLot;
  vehicle: Vehicle;
  blockCode: string;
  parkingSlot: ParkingSlot;
  timeFrame: TimeFrame;
  startTime: Date;
  endTime: Date;
  bookingDate: Date;
};

type Reservation = {
  //
  id: string;
  idTicket: string;

  idParkingReservation: string;
  idVehicle: string;
  idUser: string;
  idParkingSlot: string;
  idTimeFrame: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  total: string;
  status: string;
};

type Favorite = {
  idFavorite: string;
  idUser: string;
  id: string;
};
