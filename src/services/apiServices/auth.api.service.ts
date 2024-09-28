import AxiosService from "@/services/axios.service";
import { AUTH_PATH } from "@/lib/constants/api.contants";
import {
  ConfirmEmailSpecification,
  ForgotPasswordSpecification,
  LoginSpecification,
  RegisterSpecification,
  ResendEmailSpecification,
  ResetPasswordSpecification,
  VerifyEmailSpecification,
  GoogleSpecification,
  RegisterResponse,
} from "@/lib/specification/auth.spefication";
import { AxiosResponse } from "axios";
import { ResponseApi } from "@/lib/types/api.type";
import TokenService from "../token.service";
import { Token } from "@/lib/types/auth.type";

export default class AuthApiService {
  private static API = AxiosService.getAxiosWithoutHeader();
  private static API_AUTH = AxiosService.getAxiosAuth();

  static async register(
    data: RegisterSpecification
  ): Promise<AxiosResponse<ResponseApi<RegisterResponse>>> {
    return AuthApiService.API.post(AUTH_PATH.REGISTER, data);
  }

  static async verifyEmail(
    token: string,
    data: VerifyEmailSpecification
  ): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API.post(`${AUTH_PATH.VERIFY_EMAIL}/${token}`, data);
  }

  static async resendEmail(
    data: ResendEmailSpecification
  ): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API.post(AUTH_PATH.RESEND_EMAIl, data);
  }

  static async confirmEmail(
    data: ConfirmEmailSpecification
  ): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API.post(AUTH_PATH.CONFIRM_EMAIL, data);
  }

  static async forgotPassword(
    data: ForgotPasswordSpecification
  ): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API.post(AUTH_PATH.FORGOT_PASSWORD, data);
  }

  static async resetPassword(
    token: string,
    data: ResetPasswordSpecification
  ): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API.post(
      `${AUTH_PATH.RESET_PASSWORD}/${token}`,
      data
    );
  }

  static async verifyResetToken(
    token: string
  ): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API.get(`${AUTH_PATH.RESET_PASSWORD}/${token}`);
  }

  static async login(
    data: LoginSpecification
  ): Promise<AxiosResponse<ResponseApi<Token>>> {
    const response = await AuthApiService.API.post(AUTH_PATH.LOGIN, data);
    if (response?.data) {
      TokenService.updateToken(response.data.data);
    }
    return response;
  }

  static async logout(): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API_AUTH.post(AUTH_PATH.LOGOUT);
  }

  static async me(): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API_AUTH.get(AUTH_PATH.ME);
  }

  static async google(
    data: GoogleSpecification
  ): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API.post(AUTH_PATH.GOOGLE, data);
  }

  static async refreshToken(): Promise<AxiosResponse<ResponseApi<unknown>>> {
    return AuthApiService.API.post(AUTH_PATH.REFRESH_TOKEN);
  }
}
