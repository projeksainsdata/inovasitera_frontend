export const ROLE = {
  ADMIN: "admin",
  MEMBER: "member",
  INOVATOR: "innovator",
};

export const ROLE_LABEL = {
  [ROLE.ADMIN]: "Admin",
  [ROLE.MEMBER]: "Member",
  [ROLE.INOVATOR]: "Innovator",
};


export const ROLE_LIST = Object.values(ROLE);

export const ROLE_MAP = {
  [ROLE.MEMBER]: "Member",
  [ROLE.ADMIN]: "Admin",
  [ROLE.INOVATOR]: "innovator",
};
export const ROLE_PERMISSION = {
  [ROLE.ADMIN]: [ROLE.ADMIN],
  [ROLE.INOVATOR]: [ROLE.ADMIN, ROLE.INOVATOR],
  [ROLE.MEMBER]: [ROLE.ADMIN, ROLE.INOVATOR, ROLE.MEMBER],
};

export default ROLE;
