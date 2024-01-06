import { Context } from "hono";

import { UserService } from "../services/users.service";

export class UserController extends UserService {
    public registerUser = async (ctx: Context) => {
        try {
            const reqBody = await ctx.req.json();
            const data = await this.registerUserS(reqBody);
            return ctx.json({ status: 201, message: data  });
        }
        catch (error: any) {
            return error.message === "Email already exists" ? ctx.json({status: 409, error: error.message}, 409) : ctx.json({status: 500, error: error.message}, 500);
        }
    };

    public verifyUser = async (ctx: Context) => {
        try {
            const reqBody = await ctx.req.json();
            const data = await this.verifyUserS(reqBody);
            return ctx.json({ status: 200, message: data });
        }
        catch (error: any) {
            return error.message === "Invalid OTP" ? ctx.json({status: 401, error: error.message}, 401) : ctx.json({status: 500, error: error.message}, 500);
        }
    };

    public loginUser = async (ctx: Context) => {
        try {
            const reqBody = await ctx.req.json();
            const data = await this.loginUserS(reqBody);
            return ctx.json({ status: 200, message: data });
        }
        catch (error: any) {
            switch (error.message) {
                case "Invalid credentials": { return ctx.json({ status: 401, error: error.message }, 401); }
                case "Email not verified": { return ctx.json({ status: 403, error: error.message }, 403); }
                default: { return ctx.json({ status: 500, error: error.message }, 500); }
            }
        }
    };

    public whoami = async (ctx: Context) => {
        try {
            const data = await this.whoamiS(ctx);
            return ctx.json({ status: 200, message: data }, 200);
        }
        catch (error: any) {
            return error.message === "User not found" ? ctx.json({status: 404, error: error.message}, 404) : ctx.json({status: 500, error: error.message}, 500);
        }
    };
}