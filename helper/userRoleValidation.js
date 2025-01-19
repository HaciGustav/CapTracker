import { userRoleTypes } from "./enums";

export const isUserAdminBySession = (session) => {
  const userRole = session?.user?.user?.user_role;
  return userRole === userRoleTypes.ADMIN;
};
export const isUserManagerBySession = (session) => {
  const userRole = session?.user?.user?.user_role;
  return userRole === userRoleTypes.MANAGER;
};

export const isUserStaffBySession = (session) => {
  const userRole = session?.user?.user?.user_role;
  return userRole === userRoleTypes.STAFF;
};
