import React, { useState, useEffect } from "react";
import GetAvatarByUser from "./GetAvatarByUser";
import UploadAvatar from "./UploadAvatar";

export default function MyProfile({ loggedIn }) {


    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <h3 className="mt-5 text-center">My Profile</h3>
                </div>


                <div className="row">
                    <div className="col-6">
                        <UploadAvatar loggedIn={loggedIn} />
                    </div>
                    {/* <div className="col-6">
                    <EditPost loggedIn={loggedIn}/>
                  </div> */}
                </div>

                <div className="row">
                    <GetAvatarByUser loggedIn={loggedIn} />
                </div>
            </div>

        </React.Fragment>
    )
}
//<GetAvatarByUser loggedIn={loggedIn} />