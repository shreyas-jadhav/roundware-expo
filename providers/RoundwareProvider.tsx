import React, { useEffect, useState } from "react";
import { Asset } from "../types/asset";
export const RoundwareContext = React.createContext<RoundwareContextType>(
  undefined!
);

interface RoundwareContextType {
  assets: Asset[];
}
export const useRoundware = () => React.useContext(RoundwareContext);
export const RoundwareProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  useEffect(() => {
    async function initRoundware() {
      const roundwareApiUrl = `https://prod.roundware.com/api/2`;

      // create user
      const res = await fetch(roundwareApiUrl + `/users/`, {
        method: "POST",

        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify({
          device_id: "T1PoV0JviKtcFUEhPMULY",
          client_type: `iPhone`,
          client_system: `iOS 15`,
        }),
      });

      if (res.status != 200) {
        console.error(`User Failed`);
        console.log(await res.json());
        return;
      }
      // get token
      const user = await res.json();
      console.log(user);

      const headers = {
        "Content-Type": `application/json`,
        Authorization: `token ${user.token}`,
      };

      const assetsRes = await fetch(roundwareApiUrl + `/assets/?project_id=1`, {
        headers,
      });
      const assets = await assetsRes.json();

      setAssets(assets);
    }
    initRoundware();
  }, []);

  return (
    <RoundwareContext.Provider
      value={{
        assets,
      }}
    >
      {children}
    </RoundwareContext.Provider>
  );
};
