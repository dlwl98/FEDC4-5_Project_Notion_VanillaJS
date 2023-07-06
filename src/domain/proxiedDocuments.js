import { getDocuments } from '../api';

export const proxiedDocuments = new Proxy(
  {
    documents: await getDocuments(),
    staleTime: Date.now() + 5000,
  },
  {
    set(target, prop, value) {
      switch (prop) {
        case 'staleTime':
          return Reflect.set(target, prop, value);
        case 'documents':
          console.error('[proxy error] documents를 직접 수정할 수 없습니다.');
          return target[prop];
      }
    },

    async get(target, prop) {
      switch (prop) {
        case 'staleTime':
          return Promise.resolve(target.staleTime);
        case 'documents':
          if (target.staleTime < Date.now()) {
            target.documents = await getDocuments();
            target.staleTime = Date.now() + 5000;
          }
          return Promise.resolve(target.documents);
      }
    },
  },
);