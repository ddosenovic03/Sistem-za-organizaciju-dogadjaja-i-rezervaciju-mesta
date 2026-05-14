import { useState } from "react";
import { createDogadjaj } from "../services/dogadjajService";

function DogadjajForma({onDogadjajCreated}) {
    const [formData, setFormData] = useState({naziv: "", opis: "", datumOdrzavanja: "", maksBrMesta: "",organizatorId: "", lokacijaId: ""});
    const [greska, setGreska] = useState("");

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createDogadjaj({
                ...formData,
                maksBrMesta: Number(formData.maksBrMesta),
                organizatorId: Number(formData.organizatorId),
                lokacijaId: Number(formData.lokacijaId)
            });

            setFormData({naziv: "", opis: "", datumOdrzavanja: "", maksBrMesta: "",organizatorId: "", lokacijaId: ""});
            setGreska("");

            onDogadjajCreated();
        } catch (error) {
            setGreska(error.message);
        }
    }

    return (
        <div className="card p-3 mt-4">
            <h2>Dodaj događaj</h2>
            {greska && <div className="alert alert-danger">{greska}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" name="naziv" placeholder="Naziv" className="form-control" value={formData.naziv} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <textarea name="opis" placeholder="Opis" className="form-control" value={formData.opis} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <input type="datetime-local" name="datumOdrzavanja" className="form-control" value={formData.datumOdrzavanja} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="number" name="maksBrMesta" placeholder="Maksimalan broj mesta" className="form-control" value={formData.maksBrMesta} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="number" name="organizatorId" placeholder="ID organizatora" className="form-control" value={formData.organizatorId} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="number" name="lokacijaId" placeholder="ID lokacije" className="form-control" value={formData.lokacijaId} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Dodaj</button>
            </form>
        </div>
    );
}

export default DogadjajForma;