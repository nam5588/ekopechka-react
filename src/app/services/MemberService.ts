import axios from "axios";
import { serverApi } from "../../lib/config";
import {
	LoginInput,
	Member,
	MemberInput,
	MemberUpdateInput,
} from "../../lib/types/member";

class MemberService {
	private readonly path: string;

	constructor() {
		this.path = serverApi;
	}

	public async signup(input: MemberInput): Promise<Member> {
		try {
			let url = `${this.path}/member/signup`;
			const result = await axios.post(url, input, { withCredentials: true });
			const member: Member = result.data.member;
			localStorage.setItem("memberData", JSON.stringify(member));
			localStorage.setItem("accessToken", result.data.accessToken);
			return member;
		} catch (err) {
			console.log("Error, signup", err);
			throw err;
		}
	}

	public async login(input: LoginInput): Promise<Member> {
		try {
			let url = this.path + "/member/login";
			const result = await axios.post(url, input, { withCredentials: true });
			const member: Member = result.data.member;
			localStorage.setItem("memberData", JSON.stringify(member));
			localStorage.setItem("accessToken", result.data.accessToken);
			return member;
		} catch (err) {
			console.log("Error, login", err);
			throw err;
		}
	}

	public async logout(): Promise<void> {
		try {
			const url = `${this.path}/member/logout`;
			const result = await axios.post(url, {}, { withCredentials: true });
			console.log(result);
			localStorage.removeItem("memberData");
			localStorage.removeItem("accessToken");
		} catch (err) {
			console.log("Error, logout", err);
			throw err;
		}
	}
	public async updateMember(input: MemberUpdateInput): Promise<Member> {
		try {
			const url = `${this.path}/member/update`;
			const formData = new FormData();
			formData.append("memberNick", input.memberNick || "");
			formData.append("memberPhone", input.memberPhone || "");
			formData.append("memberAddress", input.memberAddress || "");
			formData.append("memberDesc", input.memberDesc || "");
			formData.append("memberImage", input.memberImage || "");

			const result = await axios(url, {
				method: "POST",
				data: formData,
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("uploadImage:", result);
			const member: Member = result.data;
			localStorage.setItem("memberData", JSON.stringify(member));
			return member;
		} catch (err) {
			console.log("Error, logout", err);
			throw err;
		}
	}
}

export default MemberService;
