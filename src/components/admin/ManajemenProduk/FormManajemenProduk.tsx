import React from "react";
import GenericForm, { FieldConfig } from "@/components/Form/GenericForm";
import * as Yup from "yup";

import { InovationManageSchema } from "@/lib/types/inovation.type";

interface PropsFormUser {
  handleSubmit: (props: InovationManageSchema) => void;
  initialValues?: InovationManageSchema | null;
}

const FormUser: React.FC<PropsFormUser> = ({ handleSubmit, initialValues }) => {
  // Remove the declaration of FormUser variable
  const fields: FieldConfig[] = [
    // pending', 'approved', 'rejected'

    {
      name: "status",
      label: "Ubah Status Inovasi",
      type: "radio",
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],

      validation: Yup.string().required("Status is required"),
    },
  ];

  const initialValuesForm: InovationManageSchema = initialValues || {
    status: "",
  };

  return (
    <div className="mx-auto max-w-md">
      <GenericForm
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={initialValuesForm}
      />
    </div>
  );
};

export default FormUser;
