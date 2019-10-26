export interface UserRegisterRequest {
	firstName: string;
	lastName:  string;
	username:  string;
	email:     string;
	gender:    string;
}

export interface UserPatchRequest {
	firstName?: string;
	lastName?:  string;
	gender?:    string;
}
