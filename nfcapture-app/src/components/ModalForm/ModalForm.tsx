import { FC, useCallback, useState } from "react";
import "./ModalForm.scss"


type FormProps = {
    onSubmit: (data: {name: string, id: string}) => void;
    type?: "equipment" | "user";
    action?: string;
};

const ModalForm: FC<FormProps> = ({ type="equipment", onSubmit, action="Create" }) => {
    const [formData, setFormData] = useState({ name: "", id: "" });

    const handleChange = (event: any) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleSubmit = useCallback(() => {
        onSubmit(formData);
    }, [onSubmit, formData]);

    return (
        <div className="Form" style={{marginLeft:`${type == "equipment" ? "80%" : "35%"}`}}>
            <form className="Form__container">
                <input
                    type="text"
                    placeholder={type == "equipment" ? "Equipment Name" : "User Name"}
                    onChange={handleChange}
                    name="name"
                />
                <button className="colored-btn" onClick={handleSubmit}>{action}</button>
            </form>
        </div>
    )
}

export default ModalForm;