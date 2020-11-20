import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class ElasticsearchService implements OnModuleInit {
	private client: Client;
	constructor(private envService: EnvironmentService) {}
	async onModuleInit() {
		const client = new Client({
			node: this.envService.ENVIRONMENT.ELASTICSEARCH_HOST,
		});
		this.client = client;
	}

	public async search(
		dataQuery: {
			index: string;
			body: any;
		},
		paging: {
			page: number;
			pageSize: number;
		},
		sort?: string[],
	) {
		return await this.client.search({
			index: dataQuery.index,
			body: dataQuery.body,
			from: paging.page,
			size: paging.pageSize,
			sort,
		});
	}

	public async createData(data: any, index: string) {
		return await this.client.index({
			index,
			id: data.id,
			body: data,
		});
	}

	public async updateData(input: { data: any; index: string; id: string }) {
		return await this.client.update({
			body: {
				doc: {
					...input.data,
				},
			},
			id: input.id,
			index: input.index,
		});
	}

	public async deleteData(index: string, id: string) {
		return await this.client.delete({
			id,
			index,
		});
	}
}
