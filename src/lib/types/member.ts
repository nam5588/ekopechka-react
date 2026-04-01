import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
	_id: string;
	memberType: MemberType;
	memberStatus: MemberStatus;
	memberNick: string;
	memberPhone: string;
	memberPassword?: string;
	memberImage?: string;
	memberAddress?: string;
	memberDesc?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface MemberInput {
	memberType: MemberType;
	memberStatus: MemberStatus;
	memberNick: string;
	memberPhone: string;
	memberPassword: string;
	memberImage?: string;
	memberAddress?: string;
	memberDesc?: string;
}
export interface LoginInput {
	memberType: any;
	memberNick: string;
	memberPassword: string;
}
