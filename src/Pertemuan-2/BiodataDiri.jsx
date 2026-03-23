import Profil from "./Profil"
import Pendidikan from "./Pendidikan"
import Skill from "./Skill"
import Hobi from "./Hobi"
import Kontak from "./Kontak"
import UserCard from "./UserCard"

export default function BiodataDiri(){
  return(
    <div className="container">

      <h1>My Biodata</h1>

      <img src="img/naura.jpeg" alt="Foto Profil" className="profile-image" />

      <div className="card">
        <Profil/>
      </div>

      <div className="card">
        <Pendidikan/>
      </div>

      <div className="card">
        <Skill/>
      </div>

      <div className="card">
        <Hobi/>
      </div>

      <div className="card">
        <Kontak/>
      </div>

    <div className="card">
      <UserCard 
        nama="Naura Rahma Fadilah"
        nim="2457301111"
        email="naura24si@mahasiswa.pcr.ac.id"
      />
    </div>

    </div>
  )
}
