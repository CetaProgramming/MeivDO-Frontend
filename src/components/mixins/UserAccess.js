import { userLogin } from "../../store/userLogin"

export default{
    methods: {
        getAccess(){
            return userLogin().role && userLogin().role.permissions.map(permission => permission.feature);
        }
    }
}