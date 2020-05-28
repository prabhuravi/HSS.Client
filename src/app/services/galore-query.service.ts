import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { NodeDc, Attributes } from '@kognifai/galore-client';
import { NodeSelectorService, QueryService } from '@kognifai/galore-ng-client';

@Injectable({
  providedIn: 'root'
})
export class GaloreQueryService {

  constructor(
    private nodeSelectorService: NodeSelectorService
  ) { }
  public fetchVesselEdge(): Observable<NodeDc[]> {
    // fetching vessels
    return from(this.nodeSelectorService.getNodes('~/Vessels'));
  }
  public getVesselNodeArrayList(edgeNode: NodeDc[]) {
    // converting edgenodes into readable array format
    const vesselNodeArrayList: Attributes[] = [];
    edgeNode[0].edges.forEach((currentValue) => {
      currentValue.target.attributes.nodeId = currentValue.target.nodeId;
      currentValue.target.attributes.name =  currentValue.target.name;
      vesselNodeArrayList.push(currentValue.target.attributes);
    });

    return vesselNodeArrayList;
  }
}
