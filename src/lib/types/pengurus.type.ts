import { Department, Member } from './models.type';

export interface Pengurus {
  year: number;
  department: Department[];
}

export interface DepartmentPengurus extends Department {}

export interface MemberPengurus extends Member {}
