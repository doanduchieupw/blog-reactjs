const UserCard = ({avatarUrl, fullname, describe}) => {
  return ( <div className="flex items-center justify-start p-4 pb-0">
    <div className="mr-2">
      <img src={avatarUrl} alt={fullname} className='w-10 h-10 rounded-full'/>
    </div>
    <div>
      <h4 className='text-base font-semibold'>{fullname}</h4>
      <p className='text-xs font-normal text-light-gray-font'>{describe}</p>
    </div>
  </div> )
}
 
export default UserCard;