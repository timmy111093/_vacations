export default {
      firstName:{
            required:{value:true,message:'Missing first name!'},
            minLength:{value:2,message:'First name too short'},
            maxLength:{value:15,message:'First name too long'}
      },
      lastName:{
            required:{value:true,message:'Missing last name!'},
            minLength:{value:2,message:'Last name too short'},
            maxLength:{value:15,message:'Last name too long'}
      },
      email:{
            required:{value:true,message:'Missing Email!'},
            minLength:{value:3,message:'Email address too short'},
            maxLength:{value:45,message:'Email address too long'}
      },
      password:{
            required:{value:true,message:'Missing password!'},
            minLength:{value:4,message:'Password too short'},
            maxLength:{value:25,message:'Password too long'},
      }
}