import { initPaginatedList } from '../utils/initPaginatedList.js';

export function segmList(segm) {
  const existList = document.getElementById('containerSegmList');
  if (existList) {
    existList.remove();
  }

  const containerSegmTitle = document.createElement('h2');
  containerSegmTitle.id = 'containerSegmTitle';

  const containerSegmList = document.createElement('div');
  containerSegmList.id = 'containerSegmList';

  const segList = document.createElement('div');
  segList.id = 'segList';

  const showMoreBtn = document.createElement('button');
  showMoreBtn.classList.add('showMoreBtn');
  showMoreBtn.textContent = 'Afficher plus';

  initPaginatedList({
    data: segm,
    container: segList,
    button: showMoreBtn,
    step: 5,
    renderItem: function (s) {
      s.CODE = s.CODE.toUpperCase();

      const segmContent = document.createElement('div');
      segmContent.classList.add('segmContent');

      const segmItem = document.createElement('div');
      segmItem.classList.add('segmItem');

      const segmInfo = document.createElement('div');
      segmInfo.classList.add('segmInfo');

      const segmCode = document.createElement('p');
      segmCode.classList.add('segmCode');
      segmCode.appendChild(
        Object.assign(document.createElement('strong'), { textContent: 'Code : ' })
      );
      segmCode.appendChild(document.createTextNode(s.CODE));

      const segmType = document.createElement('p');
      segmType.classList.add('segmType');
      segmType.appendChild(
        Object.assign(document.createElement('strong'), { textContent: 'Type : ' })
      );
      segmType.appendChild(document.createTextNode(s.TYPE));

      const btnUpdateSegm = document.createElement('div');
      btnUpdateSegm.classList.add('btnUpdateSegm');
      btnUpdateSegm.textContent = '✎';

      const btnDeleteSegm = document.createElement('button');
      btnDeleteSegm.classList.add('deletebtn');

      btnDeleteSegm.addEventListener('click', async () => {
        // const confirmation = confirm(
        //   `Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.`
        // );
        // TODO: Delete action
      });

      segmInfo.append(segmCode, segmType);
      segmItem.appendChild(segmInfo);
      segmContent.append(btnUpdateSegm, segmItem, btnDeleteSegm);

      return segmContent;
    },
  });

  containerSegmList.append(containerSegmTitle, segList, showMoreBtn);
  const main = document.querySelector('main');
  main.appendChild(containerSegmList);
}
