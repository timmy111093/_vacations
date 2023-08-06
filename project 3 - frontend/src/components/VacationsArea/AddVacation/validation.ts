export default {

      destination:{
            required:{value:true,message:'Destination required'},
            minLength:{value:3,message:'Must be 3 characters at least'},
            maxLength:{value:30,message:'30 characters max'}
      },
      description:{
            required:{value:true,message:'Description required'},
            minLength:{value:3,message:'Must be 3 characters at least'},
            maxLength:{value:1000,message:'1000 characters max'} 
      },
      vacationStart:{
            required:{value:true,message:'Starting date required'}
      },
      vacationEnd:{
            required:{value:true,message:'Description required'}
      },
      price:{
            required:{value:true,message:'price required'},
            min:{value:1,message:'price cannot below 0..'},
            max:{value:10000,message:'10,000 is max vacation price'}
      },
      image:{
            required:{value:true,message:'Image required'}
      }
}
