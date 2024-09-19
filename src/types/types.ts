// Define the shape of the state
type BearState = {
  bears: number;
};

// Define the shape of the actions
type BearActions = {
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
};

// Combine state and actions
export type BearStore = BearState & BearActions;


export type decodedProps = {
  userId: number;
  user_akun_id: number;
  nik: string;
  role: string;
  permission: [];
  iat: number;
  exp: number;
};