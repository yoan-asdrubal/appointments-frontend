import {BaseState, BaseStore} from './base.store';
import {BaseQuery} from './base.query';
import {BaseModel} from './base.model';
import {EntityState} from '@datorama/akita';

export abstract class BaseService<T extends BaseState | EntityState, M extends BaseModel> {

    constructor(private store: BaseStore<T>, private query: BaseQuery<T>) {
    }

    getValue() {
        return this.query.getValue();
    }

    getAll() {
        return this.query.selectAll();
    }

    add(item: any) {
        const newP = this.createFunction()(item);
        this.store.add(newP);
    }


    update(id, item: Partial<any>) {
        this.store.update(id, item);
    }

    remove(id: any) {
        this.store.remove(id);
    }

    abstract createFunction(): Function;

    /**
     * etch(action = 'LIST', options: ModelOption = {}): Observable<T[]> {

		this.dispatchAction(ListModelAction, action, options);

		return this.selectList();
	}

     fetchTable(tableId: string, options: ModelOption = {}, force = false): Observable<T[]> {
		const pageCode = options.pageCode || '';
		if (force) {
			const subscription = this._store.select(getPageableFor(tableId, pageCode))
				.pipe(
					first()

					, tap(pageable => {
						if (pageable.model) {
							this._store.dispatch(new RefreshPageAction(tableId, this.model()).widthCode(pageCode));
						} else {
							this._store.dispatch(new LoadPageAction(tableId, options.query || new QueryInfo()).widthCode(pageCode));
						}
					})
				)
				.subscribe(() => setTimeout(() => subscription.unsubscribe()));
		}
		return combineLatest(this.selectPage(tableId, pageCode), this._store.select(selectTableConfig(this.model(), tableId, pageCode)))
			.pipe(
				filter(([first, second]) => !!second),
				map(([first, second]) => first)
			);
	}

     fetchById(id: number | string | any, action = 'GET', options: ModelOption = {ds: {modelId: id, urlParams: {id: id}}}): Observable<T> {

		this.dispatchAction(GetSingleModelAction, action, options);

		return this.selectMap().pipe(
			map(val => val[id])
			, skip(1)
			, filter(model => !!model)
			, share()
		);
	}


     selectById(id: string): Observable<T> {
		return this.selectMap().pipe(
			map(val => val[id])
			, filter(model => !!model)
			, share()
		);
	}

     selectPage(tableId: string, code: any = ''): Observable<T[]> {
		return this._store.select(getModelDataByTable(this.model(), tableId, code));
	}

     selectList(): Observable<T[]> {

		return this._store.select(getModelList(this.model()));
	}

     selectMap(): Observable<{ [id: string]: T }> {
		return this._store.select(getModelMap(this.model()));
	}

     selectOrFetch(action = 'LIST', options: ModelOption = {}): Observable<T[]> {

		const subscription = this.selectList()
			.pipe(
				filter(list => list.length === 0)

				, tap(() => this.dispatchAction(ListModelAction, action, options))
			)

			.subscribe(() => setTimeout(() => subscription.unsubscribe()));

		return this.selectList();
	}

     refresh(id: number, action = 'GET', options: ModelOption = {ds: {urlParams: {id: id}}}): Observable<T> {

		return this.fetchById(id, action, options)
			.pipe(
				tap((model: T) => this._onModelUpdated.next(model))
			);
	}

     add(model: T | any, options: ModelOption = {}): Observable<T> {
		this.dispatchAction(AddModelAction, 'POST', this._mixOptions(options, {body: model}));
		return UserActions.stopUntil(this.onModelAdded(), this.onError());
	}


     update(options: ModelOption): Observable<T> {
        this.dispatchAction(UpdateModelAction, 'PUT', options);
        return UserActions.stopUntil(this.onModelUpdated(), this.onError());
    }

     patch(data: any, id: any, options: ModelOption = {}): Observable<any> {
        this.dispatchAction(UpdateModelAction, 'PATCH', this._mixOptions(options, {
            modelId: id,
            body: data,
            urlParams: {id: id}
        }));

        return UserActions.stopUntil(this.onModelUpdated(), this.onError());
    }

     remove(model: T, options: ModelOption = {}): Observable<boolean> {
        this.dispatchAction(DeleteModelAction, 'DELETE', options);
        return UserActions.stopUntil(this.onModelDelete(), this.onError());
    }

     set(model: T) {
        this._store.dispatch(new GetSingleModelSuccessAction(this.model(), 'GET', model));

    }

     */
}

