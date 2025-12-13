export interface UserData{
id: number,
restaurantName: string,
firstName: string,
lastName: string,
address: string,
phoneNumber: string,
password: string,
password2: string,
}
export type NewUserData = Omit<UserData, 'restaurantName'>;