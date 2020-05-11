import AccountType from "../_enums/account-type";

interface IAccount {
  number: string;
  isActive: boolean;
  name: string;
  accountType: AccountType;
}

export default IAccount;
