import React from "react";
import { render } from '@testing-library/react';
import ListCandidates from "./index";

const LIST = [
  {
      "id": "974ba712-5f09-559b-a14f-81db3d70a86d",
      "firstname": "Patrick",
      "lastname": "Kimura",
      "age": 63,
      "slogan": "Loduw ca gago po laco udozas gusjikora dinek ov dolop.",
      "votes": 10
  },
  {
    "id": "d9ff5749-33fa-575a-9a48-532975bb7471",
    "firstname": "Rhoda",
    "lastname": "Monti",
    "age": 30,
    "slogan": "Omames vubruava pabe bewo maari hegga gi pukdofuk pako mamuda.",
    "votes": 1
  },
  {
      "id": "20667b1e-13b0-5d3d-a86c-44ed8c54ae0b",
      "firstname": "Frances",
      "lastname": "Gimenez",
      "age": 37,
      "slogan": "Holigeni voj orve ge ok lan dalom pak ojwaj nazafafav.",
      "votes": 0
  },
  {
      "id": "e238be68-53f6-5884-8755-7ab842f6545c",
      "firstname": "Minnie",
      "lastname": "Staccioli",
      "age": 35,
      "slogan": "Zegu zah dobbidol ikima evto dookji fejzecor nudbezbuv viuf waaz.",
      "votes": 9
  },
  {
      "id": "6993369c-65b2-5db9-950b-717e13bb54a9",
      "firstname": "Susan",
      "lastname": "Gillet",
      "age": 60,
      "slogan": "Ah redat azojomal vuov niileace ufudunom fapuw ciwlag weluferah vov.",
      "votes": 8
  },
  {
      "id": "a0409939-5ba6-5ebc-897d-6b6502d255d3",
      "firstname": "Etta",
      "lastname": "Corsini",
      "age": 50,
      "slogan": "Dor nehozo or kuf za guos jirmud wekulpi luvaz liilo.",
      "votes": 8
  },
  {
      "id": "1e658027-1544-5dc9-80f9-4ad2f8263b0e",
      "firstname": "Angel",
      "lastname": "Baker",
      "age": 50,
      "slogan": "Fa guro jawojsi zowu gadocri dedabjal wuocohim kavcab gegobder dipic.",
      "votes": 8
  },
  {
    "id": "f3dc5202-edb4-564b-b47b-4d04cb27acdd",
    "firstname": "Ida",
    "lastname": "Nunez",
    "age": 50,
    "slogan": "Mecodi rozfe vugubsul dec fe jeac dega darirhod vu lotfioz.",
    "votes": 5
  },
  {
      "id": "cd185c92-e698-5e56-8e21-25d40bcbd1c0",
      "firstname": "Frances",
      "lastname": "Coppini",
      "age": 64,
      "slogan": "Fuas deh dasareb agbe nupjo genzicbe uc otear osakecame wibi.",
      "votes": 4
  },
  {
      "id": "43eacb32-283c-5b64-9190-8d8b55d6508f",
      "firstname": "Michael",
      "lastname": "Tanganelli",
      "age": 40,
      "slogan": "Ojepico ki fa savzar ilu divosme resep dabiaf ron da.",
      "votes": 8
  },
  {
      "id": "8eb9048b-4dbe-59d7-a5eb-93c379c4a547",
      "firstname": "Frank",
      "lastname": "Massey",
      "age": 49,
      "slogan": "Je feg ve zosu sif jerbig cuguemi hikhu sahbejpuh bivud.",
      "votes": 7
  },
  {
      "id": "efe59aa0-9b80-55b9-8e54-71ffb6eafafb",
      "firstname": "Fred",
      "lastname": "de Ridder",
      "age": 45,
      "slogan": "Loz weznaw zas rerisvas riakmit unegte beasibu bikral acnej mepot.",
      "votes": 7
  },
  {
      "id": "cbc21836-7105-5f42-bb38-687567d1866a",
      "firstname": "Keith",
      "lastname": "Lucas",
      "age": 20,
      "slogan": "Lu jawoh kuswe mo artefora foapi pib lulelca wosiraz mugawjem.",
      "votes": 7
  },
  {
      "id": "9e886f82-6bc0-5c85-93c8-9ffde00d9f64",
      "firstname": "Lucy",
      "lastname": "Gould",
      "age": 31,
      "slogan": "Dage tutsajvum enmo inca wiapow ose huc na hiskocet su.",
      "votes": 6
  },
  {
      "id": "d85d01eb-2a47-590f-a6f4-3189b3464122",
      "firstname": "Katharine",
      "lastname": "Foster",
      "age": 46,
      "slogan": "Rogku nopemiv pu sap aro awvenbim optadwej cauz zaw acoegi.",
      "votes": 1
  },
  {
      "id": "bce4e98c-5dca-5900-bea5-e7bdc409f425",
      "firstname": "Logan",
      "lastname": "Brazzini",
      "age": 39,
      "slogan": "Lacuhimah mafzo baji kib hibufla bowcu dodviw vuhohuw mo zad.",
      "votes": 1
  }
]

describe('list order', () => {
  
  it('should show the list sorted by votes first and then by age, descending', () => {

    const handleChangeVotes = jest.fn();

    const { getAllByLabelText } = render(
      <ListCandidates 
        items={LIST} 
        onChangeVotes={handleChangeVotes} 
      />
    );

    // Get all votes
    const votesValues = getAllByLabelText('votes').map(item => Number(item.textContent));

    // Get all ages
    const ageValues = getAllByLabelText('age').map(item => Number(item.textContent));

    const isSorted = votesValues.every(
      (votes,index,a) => {

        const prevVotes = a[index-1]

        return !index || (
          (
            prevVotes === votes && ageValues[index-1] >= ageValues[index]
          ) || (
            prevVotes > votes
          )
        )
      });

      expect(isSorted).toBeTruthy();

  })

})