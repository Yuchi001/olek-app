import React from 'react';
import {Button, Card, Stack, Table} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import {AddOutlined, DeleteOutlined, EditOutlined} from "@mui/icons-material";
import {useDeaths} from "../../hooks/useDeaths";
import {useGenes} from "../../hooks/useGenes";
import {useFactors} from "../../hooks/useFactors";
import {DeathEditMode, EditDeathModal} from "./EditDeathModal/EditDeathModal";
import {DeleteDeathModal} from "./DeleteDeathModal/DeleteDeathModal";

type Props = {
    pickedDeathType: number;
}
export const DeathTable = ({ pickedDeathType }: Props) => {
    const { deaths } = useDeaths(pickedDeathType);
    const { genes, createGenesRow } = useGenes();
    const { factors, createFactorsRow } = useFactors();

    return (
        <Stack spacing={1}>
            <Card>
                <Table size="sm"
                       style={{ marginTop: -10, marginBottom: 20 }}>
                    <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Description</th>
                        {genes.map((gene, index) => (<th key={index}>{gene.name}</th>))}
                        {factors.map((factor, index) => (<th key={index}>{factor.name}</th>))}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {deaths.map((row) => (
                        <tr key={row.id}>
                            <td>{row.description}</td>
                            {createGenesRow(row.genes).map((activation, index) =>
                                (
                                    <td key={index}>
                                        {activation}
                                    </td>
                                ))}
                            {createFactorsRow(row.factors).map((activation, index) =>
                                (
                                    <td key={index}>
                                        {activation}
                                    </td>
                                ))}
                            <td>
                                <Stack direction="row" alignItems="center" spacing={1} justifyContent="center">
                                    <EditDeathModal mode={DeathEditMode.Edit}
                                                    death={row}
                                                    death_type={pickedDeathType}
                                                    button={<IconButton variant="soft" color="primary" ><EditOutlined/></IconButton>} />
                                    <DeleteDeathModal button={<IconButton variant="soft" color="danger" ><DeleteOutlined/></IconButton>} />
                                </Stack>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Card>
            <EditDeathModal mode={DeathEditMode.Add}
                            death_type={pickedDeathType}
                            button={<Button fullWidth startDecorator={<AddOutlined />}>
                Add new row
            </Button>} />
        </Stack>
    )
}