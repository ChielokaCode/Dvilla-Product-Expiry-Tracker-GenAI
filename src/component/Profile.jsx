import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { SvgIcon } from "@progress/kendo-react-common";
import { undoIcon } from "@progress/kendo-svg-icons";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";

const Profile = () => {
  const [data, setData] = React.useState(undefined);

  const handleChange = (event) => {
    setData(event.data);
  };
  const handleSave = () => {};

  const country = ["USA", "Nigeria"];
  return (
    <div id="profile">
      <div className="absolute top-4 left-4 w-20 h-20 p-4">
        <Link to={"/dashboard/addProduct"}>
          <SvgIcon icon={undoIcon} />
        </Link>
      </div>
      <div className="space-y-2 flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900 mt-8">
            Profile
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly
          </p>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  aria-hidden="true"
                  className="size-20 text-gray-300"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-4 pt-4">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label className="font-medium" editorId="firstName">
                First Name&nbsp;
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={data}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-3">
              <Label className="font-medium" editorId="lastName">
                Last Name&nbsp;
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={data}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-3">
              <Label className="font-medium" editorId="email">
                Email Address&nbsp;
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={data}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-4">
              <Label className="font-medium" editorId="country">
                Country&nbsp;
              </Label>
              <DropDownList
                style={{
                  width: "390px",
                }}
                data={country}
                defaultValue="Nigeria"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-10 gap-x-6">
        <Button
          className="px-5 py-3 bg-blue-700 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSave}
          size="large"
          rounded="medium"
          themeColor={"info"}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Profile;
